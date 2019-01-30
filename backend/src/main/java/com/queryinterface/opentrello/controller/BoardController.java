package com.queryinterface.opentrello.controller;

import com.queryinterface.opentrello.exception.ResourceNotFound;
import com.queryinterface.opentrello.model.Board;
import com.queryinterface.opentrello.model.List;
import com.queryinterface.opentrello.repository.BoardRepository;
import com.queryinterface.opentrello.repository.ListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class BoardController {

    final BoardRepository boardRepository;
    final ListRepository listRepository;

    @Autowired
    public BoardController(final BoardRepository boardRepo, final ListRepository listRepo) {
        this.boardRepository = boardRepo;
        this.listRepository = listRepo;
    }

    @RequestMapping(method = RequestMethod.GET, path = "/boards")
    public ResponseEntity<Iterable<Board>> getAllBoards() {
         Iterable<Board> boards = boardRepository.findAll();
         return new ResponseEntity<>(boards, HttpStatus.OK);
    }

    @RequestMapping(method= RequestMethod.GET, path = "/boards/{boardId}")
    public ResponseEntity<Board> getBoardById(final @PathVariable Long boardId) {
        final Board board = boardRepository.findById(boardId).orElseThrow(ResourceNotFound::new);
        return new ResponseEntity<>(board, HttpStatus.OK);
    }

    @RequestMapping(method= RequestMethod.GET, path = "/boards/{boardId}/lists")
    public ResponseEntity<Iterable<List>> getLists(final @PathVariable Long boardId) {
        final Iterable<List> lists = listRepository.findAllByBoardId(boardId);
        return new ResponseEntity<>(lists, HttpStatus.OK);
    }
}
