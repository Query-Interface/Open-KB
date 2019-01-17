import * as React from 'react';
import { BoardProps, ListProps } from './Board';
import { DataSource } from '../../services/DataSource';

interface BoardState {
    lists: Array<ListProps>
}

export class Board extends React.Component<BoardProps, BoardState> {
    constructor(props: BoardProps) {
        super(props);
        this.state = {
            lists : []
        };
    }

    componentDidMount() {
        this.setState({
            lists: this.fetchLists(this.props.id)
        });
    }

    fetchLists(boardId: number): Array<ListProps> {
        return DataSource.getLists(boardId);
    }
}