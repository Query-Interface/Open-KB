package com.queryinterface.opentrello.card;

public class MoveCardAction {
    private long fromList;
    private long toList;
    private long card;
    private int from;
    private int to;

    public MoveCardAction() {
        //JSON
    }

    public MoveCardAction(long fromList, long toList, long card, int from, int to) {
        this.fromList = fromList;
        this.toList = toList;
        this.card = card;
        this.from = from;
        this.to = to;
    }

    public long getFromList() {
        return fromList;
    }

    public long getToList() {
        return toList;
    }

    public long getCard() {
        return card;
    }

    public int getFrom() {
        return from;
    }

    public int getTo() {
        return to;
    }
}
