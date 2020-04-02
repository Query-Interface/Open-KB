package com.queryinterface.opentrello.card;

import com.queryinterface.opentrello.exception.ResourceNotFound;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api")
public class CardController {

    final CardRepository cardRepository;

    @Autowired
    public CardController(final CardRepository cardRepo) {
        this.cardRepository = cardRepo;
    }

    @RequestMapping(method = RequestMethod.PUT, path = "/cards/{cardId}")
    public ResponseEntity<Card> updateCard(final @PathVariable String cardId, final @RequestBody Card newCard) {
        Card card = cardRepository.findById(UUID.fromString(cardId)).orElseThrow(ResourceNotFound::new);
        if (newCard.getDescription().isPresent()) {
            card.setDescription(newCard.getDescription().get());
        }
        card.setTitle(newCard.getTitle());
        return new ResponseEntity<>(cardRepository.save(card), HttpStatus.OK);
    }
}
