package com.queryinterface.opentrello.board;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Optional;
import java.util.UUID;

@Entity
public class Board {

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(columnDefinition = "BINARY(16)")
    private UUID id;
    private String title;
    private String description;

    Board() {
        // for JPA.
    }

    public Board(final String title, final String description) {
        this.title = title;
        this.description = description;
    }

    public UUID getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public Optional<String> getDescription() {
        return Optional.ofNullable(description);
    }

//    public java.util.List<List> getLists() {
//        return lists;
//    }

    @Override
    public String toString() {
        return "Board{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                '}';
    }
}
