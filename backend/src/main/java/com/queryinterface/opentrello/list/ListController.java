package com.queryinterface.opentrello.list;

import com.queryinterface.opentrello.card.Card;
import com.queryinterface.opentrello.card.CardRepository;
import com.queryinterface.opentrello.exception.ResourceNotFound;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class ListController {
    final ListRepository listRepository;
    final CardRepository cardRepository;

    @Autowired
    public ListController(final ListRepository listRepo, final CardRepository cardRepo) {
        this.listRepository = listRepo;
        this.cardRepository = cardRepo;
    }

    @RequestMapping(method = RequestMethod.GET, path = "/lists/{listId}")
    public ResponseEntity<List> getList(final @PathVariable Long listId) {
        final List list = listRepository.findById(listId).orElseThrow(ResourceNotFound::new);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.PUT, path = "/lists/{listId}")
    public ResponseEntity<List> updateList(final @PathVariable Long listId, final @RequestBody List newList) {
        final List list = listRepository.findById(listId).orElseThrow(ResourceNotFound::new);
        list.setTitle(newList.getTitle());
        return new ResponseEntity<>(listRepository.save(list), HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.GET, path = "/lists/{listId}/cards")
    public ResponseEntity<Iterable<Card>> getCards( final @PathVariable Long listId) {
        Iterable<Card> cards = cardRepository.findAllByListIdOrderByIndex(listId);
        return new ResponseEntity<>(cards, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.POST, path = "/lists/{listId}/cards")
    public ResponseEntity<Card> addCard(final @PathVariable Long listId, final @RequestBody Card card) {
        final List list = listRepository.findById(listId).orElseThrow(ResourceNotFound::new);
        card.setList(list);
        final Card newCard = cardRepository.save(card);
        return new ResponseEntity<>(newCard, HttpStatus.OK);
    }
}
