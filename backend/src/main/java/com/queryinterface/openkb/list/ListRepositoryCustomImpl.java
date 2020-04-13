package com.queryinterface.openkb.list;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional;
import java.util.UUID;

@Repository
@Transactional
public class ListRepositoryCustomImpl implements ListRepositoryCustom {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    @Modifying
    public void updateIndexOfList(final UUID boardId, final UUID listId, final int startIndex, final int endIndex) {
        Query query;
        // updates indexes
        if (startIndex > endIndex) {
            query = entityManager.createNativeQuery("UPDATE list SET index = index+1 WHERE board_id = ? AND index >= ? AND index < ?");
            query.setParameter(2, endIndex);
            query.setParameter(3, startIndex);
        } else {
            query = entityManager.createNativeQuery("UPDATE list SET index = index-1 WHERE board_id = ? AND index > ? AND index <= ?");
            query.setParameter(2, startIndex);
            query.setParameter(3, endIndex);
        }
        query.setParameter(1, boardId);
        query.executeUpdate();
        // set new index of moved list

        List toUpdate = entityManager.getReference(List.class, listId);
        toUpdate.setIndex(endIndex);
        entityManager.merge(toUpdate);
    }

    @Override
    public void updateIndexesAfterDelete(final UUID boardId, final int startIndex) {
        Query query = entityManager.createNativeQuery("UPDATE list SET index = index-1 WHERE board_id = ? AND index > ?");
        query.setParameter(1, boardId);
        query.setParameter(2, startIndex);
        query.executeUpdate();
    }
}
