package com.queryinterface.opentrello.repository;

import com.queryinterface.opentrello.model.List;
import org.springframework.data.repository.CrudRepository;

public interface ListRepository extends CrudRepository<com.queryinterface.opentrello.model.List, Long> {

    Iterable<List> findAllByBoardId(Long boardId);
}
