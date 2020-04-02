package com.queryinterface.opentrello.list;

import org.springframework.data.repository.CrudRepository;

import java.util.UUID;

public interface ListRepository extends CrudRepository<List, UUID>, ListRepositoryCustom {

    Iterable<List> findAllByBoardIdOrderByIndex(UUID boardId);

}
