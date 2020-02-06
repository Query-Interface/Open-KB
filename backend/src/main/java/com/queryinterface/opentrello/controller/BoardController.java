package com.queryinterface.opentrello.controller;

import com.queryinterface.opentrello.exception.ResourceNotFound;
import com.queryinterface.opentrello.model.Board;
import com.queryinterface.opentrello.model.Card;
import com.queryinterface.opentrello.model.List;
import com.queryinterface.opentrello.repository.BoardRepository;
import com.queryinterface.opentrello.repository.CardRepository;
import com.queryinterface.opentrello.repository.ListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class BoardController {

    final BoardRepository boardRepository;
    final ListRepository listRepository;
    final CardRepository cardRepository;

    @Autowired
    public BoardController(final BoardRepository boardRepo, final ListRepository listRepo, final CardRepository cardRepo) {
        this.boardRepository = boardRepo;
        this.listRepository = listRepo;
        this.cardRepository = cardRepo;
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

    @RequestMapping(method = RequestMethod.GET, path = "/boards/{boardId}/lists/{listId}")
    public ResponseEntity<List> getList(final @PathVariable Long boardId, final @PathVariable Long listId) {
        final List list = listRepository.findById(listId).orElseThrow(ResourceNotFound::new);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.POST, path = "/boards/{boardId}/lists")
    public ResponseEntity<List> addList(final @PathVariable Long boardId, final @RequestBody List list) {
        final Board board = boardRepository.findById(boardId).orElseThrow(ResourceNotFound::new);
        list.setBoard(board);
        final List newList = listRepository.save(list);
        return new ResponseEntity<>(newList, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.GET, path = "/boards/{boardId}/lists/{listId}/cards")
    public ResponseEntity<Iterable<Card>> getCards(final @PathVariable Long boardId, final @PathVariable Long listId) {
        Iterable<Card> cards = cardRepository.findAllByListId(listId);
        return new ResponseEntity<>(cards, HttpStatus.OK);
    }

}
