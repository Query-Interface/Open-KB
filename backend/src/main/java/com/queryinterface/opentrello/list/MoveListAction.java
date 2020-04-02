package com.queryinterface.opentrello.list;

public class MoveListAction {

    private String list;
    private int from;
    private int to;

    public MoveListAction() {
        // JSON
    }

    public MoveListAction(String list, int from, int to) {
        this.list = list;
        this.from = from;
        this.to = to;
    }

    public String getList() {
        return list;
    }

    public int getFrom() {
        return from;
    }

    public int getTo() {
        return to;
    }
}
