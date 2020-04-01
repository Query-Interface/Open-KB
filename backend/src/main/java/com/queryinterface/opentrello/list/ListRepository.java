package com.queryinterface.opentrello.list;

import org.springframework.data.repository.CrudRepository;

public interface ListRepository extends CrudRepository<List, Long>, ListRepositoryCustom {

    Iterable<List> findAllByBoardIdOrderByIndex(Long boardId);

}
