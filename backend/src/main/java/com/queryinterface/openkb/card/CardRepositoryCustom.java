package com.queryinterface.openkb.card;

import java.util.UUID;

public interface CardRepositoryCustom {

    void updateIndexOfCardInList(final UUID listId, final UUID cardId, final int startIndex, final int endIndex);

    void updateIndexAndMoveCard(final UUID fromListId, final UUID toListId, final UUID cardId, final int startIndex, final int endIndex);

    void updateIndexesAfterDelete(final UUID listId, final int startIndex);
}
