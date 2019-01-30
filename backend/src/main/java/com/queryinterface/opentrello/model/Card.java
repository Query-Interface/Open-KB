package com.queryinterface.opentrello.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Optional;

@Entity
public class Card {
    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    private Long id;
    private String title;
    private String description;

    Card() {
        // for JPA
    }

    public Card(final String title, final String description) {
        this.title = title;
        this.description = description;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public Optional<String> getDescription() {
        return Optional.ofNullable(description);
    }

    @Override
    public String toString() {
        return "Card{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                '}';
    }
}
