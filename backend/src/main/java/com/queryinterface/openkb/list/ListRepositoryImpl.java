package com.queryinterface.openkb.list;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Query;
import java.util.UUID;

@Component
// @Transactional not usable since when added it does not allow the usage of custom method on Repository
public class ListRepositoryImpl implements ListRepositoryCustom {

    // This factory is used to workaround @Transactional issue.
    // Without @Transactional, the following exception is raised transaction is required : javax.persistence.TransactionRequiredException executing an update/delete query
    // @Transactional not usable, since Proxy can only be created on Interface (see https://github.com/spring-projects-experimental/spring-graalvm-native/issues/197)
    // When using EntityManager provided by Spring to begin a transaction: java.lang.IllegalStateException: Not allowed to create transaction on shared EntityManager - use Spring transactions or EJB CMT instead
    @Autowired
    private EntityManagerFactory entityManagerFactory;

    @Override
    public void updateIndexOfList(final UUID boardId, final UUID listId, final int startIndex, final int endIndex) {
        final EntityManager entityManager = entityManagerFactory.createEntityManager();
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

        entityManager.getTransaction().begin();
        query.executeUpdate();
        // set new index of moved list

        List toUpdate = entityManager.getReference(List.class, listId);
        toUpdate.setIndex(endIndex);
        entityManager.merge(toUpdate);
        entityManager.getTransaction().commit();
        entityManager.close();
    }

    @Override
    public void updateIndexesAfterDelete(final UUID boardId, final int startIndex) {
        final EntityManager entityManager = entityManagerFactory.createEntityManager();
        Query query = entityManager.createNativeQuery("UPDATE list SET index = index-1 WHERE board_id = ? AND index > ?");
        query.setParameter(1, boardId);
        query.setParameter(2, startIndex);
        entityManager.getTransaction().begin();
        query.executeUpdate();
        entityManager.getTransaction().commit();
        entityManager.close();
    }
}
