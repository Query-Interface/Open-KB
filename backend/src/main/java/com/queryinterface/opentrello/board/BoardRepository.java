package com.queryinterface.opentrello.board;

import org.springframework.data.repository.CrudRepository;

import java.util.Optional;
import java.util.UUID;


public interface BoardRepository extends CrudRepository<Board, UUID> {

    Iterable<Board> findAllByTitle(final String title);

    Optional<Board> findTopByTitle(final String title);
}
