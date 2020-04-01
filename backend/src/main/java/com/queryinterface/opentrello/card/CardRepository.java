package com.queryinterface.opentrello.card;

import org.springframework.data.repository.CrudRepository;

public interface CardRepository extends CrudRepository<Card, Long>, CardRepositoryCustom {

    Iterable<Card> findAllByListIdOrderByIndex(Long listId);
}
