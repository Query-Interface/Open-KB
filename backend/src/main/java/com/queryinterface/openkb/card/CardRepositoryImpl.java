package com.queryinterface.openkb.card;

import com.queryinterface.openkb.list.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Query;
import java.util.UUID;

@Component
public class CardRepositoryImpl implements CardRepositoryCustom {

    @Autowired
    private EntityManagerFactory entityManagerFactory;

    @Override
    public void updateIndexOfCardInList(UUID listId, UUID cardId, int startIndex, int endIndex) {
        final EntityManager entityManager = entityManagerFactory.createEntityManager();
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

        entityManager.getTransaction().begin();
        query.executeUpdate();
        // set new index of moved list

        Card toUpdate = entityManager.getReference(Card.class, cardId);
        toUpdate.setIndex(endIndex);
        entityManager.merge(toUpdate);
        entityManager.getTransaction().commit();
        entityManager.close();
    }

    @Override
    public void updateIndexAndMoveCard(final UUID fromListId, final UUID toListId, UUID cardId, final int startIndex, final int endIndex) {
        final EntityManager entityManager = entityManagerFactory.createEntityManager();
        entityManager.getTransaction().begin();
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
        entityManager.getTransaction().commit();
        entityManager.close();
    }

    @Override
    public void updateIndexesAfterDelete(final UUID listId, final int startIndex) {
        final EntityManager entityManager = entityManagerFactory.createEntityManager();
        Query query = entityManager.createNativeQuery("UPDATE card SET index = index-1 WHERE list_id = ? AND index > ?");
        query.setParameter(1, listId);
        query.setParameter(2, startIndex);

        entityManager.getTransaction().begin();
        query.executeUpdate();
        entityManager.getTransaction().commit();
        entityManager.close();
    }
}
