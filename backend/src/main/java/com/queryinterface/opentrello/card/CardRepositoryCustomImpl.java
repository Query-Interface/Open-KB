package com.queryinterface.opentrello.card;

import com.queryinterface.opentrello.list.List;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional;
import java.util.UUID;

@Repository
@Transactional
public class CardRepositoryCustomImpl implements CardRepositoryCustom {

    @PersistenceContext
    EntityManager entityManager;

    @Override
    public void updateIndexOfCardInList(UUID listId, UUID cardId, int startIndex, int endIndex) {
        Query query;
        // updates indexes
        if (startIndex > endIndex) {
            query = entityManager.createNativeQuery("UPDATE card SET index = index+1 WHERE list_id = ? AND index >= ? AND index < ?");
            query.setParameter(2, endIndex);
            query.setParameter(3, startIndex);
        } else {
            query = entityManager.createNativeQuery("UPDATE card SET index = index-1 WHERE list_id = ? AND index > ? AND index <= ?");
            query.setParameter(2, startIndex);
            query.setParameter(3, endIndex);
        }
        query.setParameter(1, listId);
        query.executeUpdate();
        // set new index of moved list

        Card toUpdate = entityManager.getReference(Card.class, cardId);
        toUpdate.setIndex(endIndex);
        entityManager.merge(toUpdate);
    }

    @Override
    public void updateIndexAndMoveCard(final UUID fromListId, final UUID toListId, UUID cardId, final int startIndex, final int endIndex) {
        // update destination list
        Query updateDestinationQuery = entityManager.createNativeQuery("UPDATE card SET index = index+1 WHERE list_id = ? AND index >= ?");
        updateDestinationQuery.setParameter(1, toListId);
        updateDestinationQuery.setParameter(2, endIndex);
        updateDestinationQuery.executeUpdate();

        // update source list
        Query updateSourceQuery = entityManager.createNativeQuery("UPDATE card SET index = index-1 WHERE list_id= ? AND index > ?");
        updateSourceQuery.setParameter(1, fromListId);
        updateSourceQuery.setParameter(2, startIndex);
        updateSourceQuery.executeUpdate();

        // update card parent
        Card toUpdate = entityManager.getReference(Card.class, cardId);
        List newParentList = entityManager.getReference(List.class, toListId);
        toUpdate.setList(newParentList);
        toUpdate.setIndex(endIndex);
        entityManager.merge(toUpdate);
    }

    @Override
    public void updateIndexesAfterDelete(final UUID listId, final int startIndex) {
        Query query = entityManager.createNativeQuery("UPDATE card SET index = index-1 WHERE list_id = ? AND index > ?");
        query.setParameter(1, listId);
        query.setParameter(2, startIndex);
        query.executeUpdate();
    }
}
