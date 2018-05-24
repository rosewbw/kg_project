import React, {Component} from 'react';

import SearchInput from './searchInput'
import SearchList from './searchList'

import {Row, Col} from 'antd';

class SearchPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            searchInput:''
        }
    }

    updateSearchList = (data) => {
        console.log(data)
        this.setState({
            searchInput:data.searchInput
        })
    }

    render() {
        return (
            <div id="searchWrapper" className="searchWrapper">
                <Row
                    style={{marginTop:'1rem', marginBottom:'1rem'}}
                >
                    <SearchInput
                        updateSearchList={this.updateSearchList}
                    />
                </Row>
                <Row
                    type="flex"
                    justify="center"
                >
                    <Col span={20}>
                        <h1>搜索词：{this.state.searchInput}</h1>
                        <SearchList/>
                    </Col>
                </Row>


            </div>
        );
    }
}


export default SearchPage