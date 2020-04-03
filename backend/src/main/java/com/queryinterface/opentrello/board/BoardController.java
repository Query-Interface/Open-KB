package com.queryinterface.opentrello.board;

import com.queryinterface.opentrello.exception.ResourceNotFound;
import com.queryinterface.opentrello.card.Card;
import com.queryinterface.opentrello.list.List;
import com.queryinterface.opentrello.list.MoveListAction;
import com.queryinterface.opentrello.card.MoveCardAction;
import com.queryinterface.opentrello.card.CardRepository;
import com.queryinterface.opentrello.list.ListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

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
    public ResponseEntity<Board> getBoardById(final @PathVariable String boardId) {
        final Board board = boardRepository.findById(UUID.fromString(boardId)).orElseThrow(ResourceNotFound::new);
        return new ResponseEntity<>(board, HttpStatus.OK);
    }

    @RequestMapping(method= RequestMethod.GET, path = "/boards/{boardId}/lists")
    public ResponseEntity<Iterable<List>> getLists(final @PathVariable String boardId) {
        final Iterable<List> lists = listRepository.findAllByBoardIdOrderByIndex(UUID.fromString(boardId));
        return new ResponseEntity<>(lists, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.POST, path = "/boards/{boardId}/lists")
    public ResponseEntity<List> addList(final @PathVariable String boardId, final @RequestBody List list) {
        final Board board = boardRepository.findById(UUID.fromString(boardId)).orElseThrow(ResourceNotFound::new);
        list.setBoard(board);
        final List newList = listRepository.save(list);
        return new ResponseEntity<>(newList, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.PUT, path = "/boards/{boardId}/lists/swapper")
    public ResponseEntity swapLists(final @PathVariable String boardId, final @RequestBody MoveListAction moveListAction) {
        listRepository.updateIndexOfList(UUID.fromString(boardId), UUID.fromString(moveListAction.getList()), moveListAction.getFrom(), moveListAction.getTo());
        return ResponseEntity.ok().build();
    }

    @RequestMapping(method = RequestMethod.PUT, path = "/boards/{boardId}/cards/swapper")
    public ResponseEntity swapCardsInList(final @PathVariable String boardId, final @RequestBody MoveCardAction moveCardAction) {
        if (moveCardAction.getFromList().equals(moveCardAction.getToList())) {
            cardRepository.updateIndexOfCardInList(UUID.fromString(moveCardAction.getFromList()), UUID.fromString(moveCardAction.getCard()), moveCardAction.getFrom(), moveCardAction.getTo());
        } else {
            cardRepository.updateIndexAndMoveCard(UUID.fromString(moveCardAction.getFromList()), UUID.fromString(moveCardAction.getToList()), UUID.fromString(moveCardAction.getCard()), moveCardAction.getFrom(), moveCardAction.getTo());
        }
        return ResponseEntity.ok().build();
    }
}
