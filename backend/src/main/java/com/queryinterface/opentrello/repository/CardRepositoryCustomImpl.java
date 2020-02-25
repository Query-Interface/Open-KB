package com.queryinterface.opentrello.repository;

import com.queryinterface.opentrello.model.Card;
import com.queryinterface.opentrello.model.List;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional;

@Repository
@Transactional
public class CardRepositoryCustomImpl implements CardRepositoryCustom {

    @PersistenceContext
    EntityManager entityManager;

    @Override
    public void updateIndexOfCardInList(long listId, long cardId, int startIndex, int endIndex) {
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
    public void updateIndexAndMoveCard(final long listId, long cardId, final int endIndex) {
        Query query = entityManager.createNativeQuery("UPDATE card SET index = index+1 WHERE list_id = ? AND index >= ?");
        query.setParameter(1, listId);
        query.setParameter(2, endIndex);
        query.executeUpdate();

        Card toUpdate = entityManager.getReference(Card.class, cardId);
        List newParentList = entityManager.getReference(List.class, listId);
        toUpdate.setList(newParentList);
        toUpdate.setIndex(endIndex);
        entityManager.merge(toUpdate);
    }

    @Override
    public void updateIndexesAfterDelete(final long listId, final int startIndex) {
        Query query = entityManager.createNativeQuery("UPDATE card SET index = index-1 WHERE list_id = ? AND index > ?");
        query.setParameter(1, listId);
        query.setParameter(2, startIndex);
        query.executeUpdate();
    }
}
