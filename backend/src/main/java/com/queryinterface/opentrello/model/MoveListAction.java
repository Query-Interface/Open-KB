package com.queryinterface.opentrello.model;

public class MoveListAction {

    private long list;
    private int from;
    private int to;

    public MoveListAction() {
        // JSON
    }

    public MoveListAction(long list, int from, int to) {
        this.list = list;
        this.from = from;
        this.to = to;
    }

    public long getList() {
        return list;
    }

    public int getFrom() {
        return from;
    }

    public int getTo() {
        return to;
    }
}
