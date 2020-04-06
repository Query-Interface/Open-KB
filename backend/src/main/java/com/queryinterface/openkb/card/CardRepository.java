package com.queryinterface.openkb.card;

import org.springframework.data.repository.CrudRepository;

import java.util.UUID;

public interface CardRepository extends CrudRepository<Card, UUID>, CardRepositoryCustom {

    Iterable<Card> findAllByListIdOrderByIndex(UUID listId);
}
