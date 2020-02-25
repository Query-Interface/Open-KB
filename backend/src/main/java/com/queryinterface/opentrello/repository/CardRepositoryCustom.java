package com.queryinterface.opentrello.repository;

public interface CardRepositoryCustom {

    void updateIndexOfCardInList(final long listId, final long cardId, final int startIndex, final int endIndex);

    void updateIndexAndMoveCard(final long listId, final long cardId, final int endIndex);

    void updateIndexesAfterDelete(final long listId, final int startIndex);
}
