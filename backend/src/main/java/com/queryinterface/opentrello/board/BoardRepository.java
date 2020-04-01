package com.queryinterface.opentrello.board;

import com.queryinterface.opentrello.board.Board;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;


public interface BoardRepository extends CrudRepository<Board, Long> {

    Iterable<Board> findAllByTitle(final String title);

    Optional<Board> findTopByTitle(final String title);
}
