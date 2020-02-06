package com.queryinterface.opentrello.repository;

import com.queryinterface.opentrello.model.Card;
import org.springframework.data.repository.CrudRepository;

public interface CardRepository extends CrudRepository<Card, Long> {

    Iterable<Card> findAllByListId(Long listId);
}
