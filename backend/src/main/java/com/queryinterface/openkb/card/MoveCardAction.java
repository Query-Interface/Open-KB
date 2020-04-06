package com.queryinterface.openkb.card;

public class MoveCardAction {
    private String fromList;
    private String toList;
    private String card;
    private int from;
    private int to;

    public MoveCardAction() {
        //JSON
    }

    public MoveCardAction(String fromList, String toList, String card, int from, int to) {
        this.fromList = fromList;
        this.toList = toList;
        this.card = card;
        this.from = from;
        this.to = to;
    }

    public String getFromList() {
        return fromList;
    }

    public String getToList() {
        return toList;
    }

    public String getCard() {
        return card;
    }

    public int getFrom() {
        return from;
    }

    public int getTo() {
        return to;
    }
}
