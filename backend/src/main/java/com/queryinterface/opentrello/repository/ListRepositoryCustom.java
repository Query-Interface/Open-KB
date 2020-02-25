package com.queryinterface.opentrello.repository;

public interface ListRepositoryCustom {

    void updateIndexOfList(final long boardId, final long listId, final int startIndex, final int endIndex);

    void updateIndexesAfterDelete(final long boardId, final int startIndex);
}
