package com.queryinterface.opentrello.list;

import java.util.UUID;

public interface ListRepositoryCustom {

    void updateIndexOfList(final UUID boardId, final UUID listId, final int startIndex, final int endIndex);

    void updateIndexesAfterDelete(final UUID boardId, final int startIndex);
}
