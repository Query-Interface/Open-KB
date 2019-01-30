package com.queryinterface.opentrello;

import com.queryinterface.opentrello.model.Board;
import com.queryinterface.opentrello.model.List;
import com.queryinterface.opentrello.repository.BoardRepository;
import com.queryinterface.opentrello.repository.ListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Optional;
import java.util.stream.Stream;

@Component
public class DemoDataCLR implements CommandLineRunner {

    @Autowired
    BoardRepository boardRepository;
    @Autowired
    ListRepository listRepository;

    @Override
    public void run(String... args) throws Exception {
        Stream.of("Kanban", "Backlog items", "Todos")
                .forEach( name -> boardRepository.save(new Board(name, name + " description")));

        Optional<Board> kanbanBoard = boardRepository.findTopByTitle("Kanban");
        if (kanbanBoard.isPresent()) {
            final Board board = kanbanBoard.get();
            Stream.of("Open", "In Process", "Blocked", "Closed")
                    .forEach( name -> {
                        List list = new List(name);
                        list.setBoard(board);
                        listRepository.save(list);
                    });
        }

        // confirm save with
        boardRepository.findAll().forEach(System.out::println);
    }
}
