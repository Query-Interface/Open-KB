package com.queryinterface.opentrello.repository;

import com.queryinterface.opentrello.model.Board;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;


public interface BoardRepository extends CrudRepository<Board, Long> {

    Iterable<Board> findAllByTitle(final String title);

    Optional<Board> findTopByTitle(final String title);
}
