package com.queryinterface.openkb.board;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface BoardRepository extends CrudRepository<Board, UUID> {

    Iterable<Board> findAllByTitle(final String title);

    Optional<Board> findTopByTitle(final String title);
}
