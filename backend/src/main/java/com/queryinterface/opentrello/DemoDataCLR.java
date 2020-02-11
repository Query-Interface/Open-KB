package com.queryinterface.opentrello;

import com.queryinterface.opentrello.model.Board;
import com.queryinterface.opentrello.model.Card;
import com.queryinterface.opentrello.model.List;
import com.queryinterface.opentrello.repository.BoardRepository;
import com.queryinterface.opentrello.repository.CardRepository;
import com.queryinterface.opentrello.repository.ListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Optional;
import java.util.stream.Stream;

@Component
public class DemoDataCLR implements CommandLineRunner {

    @Autowired
    BoardRepository boardRepository;
    @Autowired
    ListRepository listRepository;
    @Autowired
    CardRepository cardRepository;

    @Override
    public void run(String... args) throws Exception {
        Stream.of("Kanban", "Backlog items", "Todos")
                .forEach( name -> boardRepository.save(new Board(name, name + " description")));

        Optional<Board> kanbanBoard = boardRepository.findTopByTitle("Kanban");
        if (kanbanBoard.isPresent()) {
            final Board board = kanbanBoard.get();
            int index = 1;
            final String[] names = { "Open", "In Process", "Blocked", "Closed" };
            for (String name: names) {
                List list = new List(name);
                list.setBoard(board);
                list.setIndex(index);
                index++;
                listRepository.save(list);
            }
            Board openBoard = boardRepository.findTopByTitle("Kanban").get();
            Iterable<List> lists = listRepository.findAllByBoardId(openBoard.getId());
            for (List list : lists) {
                if (list.getTitle().equals("Open")) {
                    final Card card1 = new Card("Finalize cards", "finalize cards implementation");
                    card1.setList(list);
                    card1.setIndex(1);
                    cardRepository.save(card1);
                    final Card card2 = new Card("Adds events", "Adds event handler on the following buttons: 'add List', 'add card'");
                    card2.setList(list);
                    card2.setIndex(2);
                    cardRepository.save(card2);
                } else if (list.getTitle().equals("In Process")) {
                    final Card card3 = new Card("Add backend support for Cards", "Implement CRUD APIs for cards");
                    card3.setList(list);
                    card3.setIndex(1);
                    cardRepository.save(card3);
                } else if (list.getTitle().equals("Blocked")) {
                    // nothing
                } else {
                    final Card card4 = new Card("Move to redux", "Implement redux-toolkit support in frontend");
                    card4.setList(list);
                    card4.setIndex(1);
                    cardRepository.save(card4);
                }
            }
        }

        // confirm save with
        boardRepository.findAll().forEach(System.out::println);
    }
}
