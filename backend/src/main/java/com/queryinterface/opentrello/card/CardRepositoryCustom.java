package com.queryinterface.opentrello.card;

import java.util.UUID;

public interface CardRepositoryCustom {

    void updateIndexOfCardInList(final UUID listId, final UUID cardId, final int startIndex, final int endIndex);

    void updateIndexAndMoveCard(final UUID listId, final UUID cardId, final int endIndex);

    void updateIndexesAfterDelete(final UUID listId, final int startIndex);
}
