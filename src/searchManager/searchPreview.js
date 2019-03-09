import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import InfiniteScroll from 'react-infinite-scroller';

import { Document, Page } from 'react-pdf';
import { Row, Col, List, Card, Button } from 'antd';

import DEFAULT_PDF from './test.pdf';

const DEFAULT_MATERIAL = {
  img:
    'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2486531409,3348270894&fm=27&gp=0.jpg',
  video:
    'http://cuc-richmedia.oss-cn-beijing.aliyuncs.com/media/new_aliyun0731/P5kn52ss5n.mp4?butteruid=1527400149022'
};

const TYPE_CONVERSE = {
  视频: 'video',
  图片: 'image',
  high: '高',
  veryhigh: '很高',
  middle: '中',
  low: '低',
  verylow: '很低',
  active: '主动型',
  commentary: '解说型',
  mixing: '混合型',
  undefined: '未定义'
};

class SearchKnowledgePreview extends Component {
  state = {
    knowledgeData: this.props.knowledgeData,
    currentUrl: this.props.knowledgeData.mcourse.data.material_data.data.url,
    currentType:
      TYPE_CONVERSE[
        this.props.knowledgeData.mcourse.data.material_data.data.type
      ]
  };

  cancelEditor = () => {
    ReactDOM.unmountComponentAtNode(document.getElementById('searchPreview'));
  };

  onDocumentLoad = ({ numPages }) => {
    this.setState({ numPages });
  };

  onItemClick = ({ pageNumber }) =>
    alert('Clicked an item from page ' + pageNumber + '!');

  changeAidCourseMedia = e => {
    let pendingId = e.target.dataset.aid;
    const aidCourseInfo = this.state.knowledgeData.acourse;

    aidCourseInfo.map(item => {
      if (pendingId === item.id) {
        let type = item.data.learningObjectType;
        if (type === '') {
          type = TYPE_CONVERSE[item.data.material_data.data.type];
        }
        this.setState({
          currentUrl: item.data.material_data.data.url,
          currentType: type
        });
      }
    });
  };

  unfoldPDFView = url => {
    ReactDOM.render(
      <PDFViewer url={url} />,
      document.getElementById('pdfView')
    );
  };

  changeMainCourseMedia = e => {
    let pendingId = e.target.dataset.mid;
    const mainCourseInfo = this.state.knowledgeData.mcourse;
    if (pendingId === mainCourseInfo.id) {
      let type = mainCourseInfo.data.learningObjectType;
      if (type === '') {
        type = TYPE_CONVERSE[mainCourseInfo.data.material_data.data.type];
      }
      this.setState({
        currentUrl: mainCourseInfo.data.material_data.data.url,
        currentType: type
      });
    }
  };

  componentDidMount() {}

  render() {
    const { knowledgeData } = this.state;
    const knowledgeInfo = knowledgeData.knowledge;
    const aidCourseInfo = knowledgeData.acourse;
    const mainCourseInfo = knowledgeData.mcourse;
    const teachInfo = knowledgeData.teach;
    // const TeachInfoAreaRouter = withRouter(TeachInfoArea);
    const lessonId = knowledgeData.lesson.id;
    return (
      <div id="searchPreviewArea" className="searchPreviewArea">
        <div id="previewContainer" className="previewContainer">
          <Row>
            <Col span={24}>
              <EditorHeader closeBtn={this.cancelEditor} title={'123'} />
            </Col>
          </Row>
          <div id="previewBody" className="previewBody">
            <Row type="flex" justify="start" style={{ height: '100%' }}>
              <Col className="gutter-row" span={14} style={{ height: '27rem' }}>
                <div id="coursePreview" className="coursePreview">
                  <DisplayArea
                    unfoldPDFView={this.unfoldPDFView}
                    type={this.state.currentType}
                    url={this.state.currentUrl || DEFAULT_MATERIAL.video}
                  />
                </div>
              </Col>
              <Col
                className="gutter-row"
                span={10}
                style={{ height: '27rem', background: '#ffffff' }}
              >
                <div className="subCoursePreview">
                  <AidList
                    changeAidCourseMedia={this.changeAidCourseMedia}
                    aidCourseInfo={aidCourseInfo}
                  />
                </div>
              </Col>
            </Row>
            <Row gutter={1} style={{ height: '100%' }}>
              <Col className="gutter-row" span={6} key={1}>
                <KnowledgeInfoArea knowledgeInfo={knowledgeInfo} />
              </Col>
              <Col className="gutter-row" span={8} key={2}>
                <TeachInfoArea
                  enterLesson={this.props.enterLesson}
                  lessonId={lessonId}
                  teachInfo={teachInfo}
                />
              </Col>
              <Col className="gutter-row" span={10} key={3}>
                <MainLessonInfoArea
                  changeMainCourseMedia={this.changeMainCourseMedia}
                  mainCourseInfo={mainCourseInfo}
                />
              </Col>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}

const DisplayArea = ({ type, url, unfoldPDFView }) => {
  console.log(type);
  if (type === 'pdf') {
    return (
      <div style={{ height: '100%' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%'
          }}
          onClick={() => unfoldPDFView(url)}
        >
          <span style={{ cursor: 'pointer' }}>点击显示</span>
        </div>
        <div id="pdfView" />
      </div>
    );
  } else if (type === 'video') {
    return (
      <video
        controls="controls"
        style={{ width: '100%', height: '100%' }}
        src={url}
      />
    );
  } else if (type === 'image') {
    return <img style={{ width: '100%', height: '100%' }} src={url} />;
  } else {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%'
        }}
      >
        <span>未设置资源</span>
      </div>
    );
  }
};

const EditorHeader = ({ closeBtn, title }) => {
  return (
    <div id="editorHeader" className="editorHeader">
      <span style={{ fontSize: '17px', position: 'absolute', left: '5px' }}>
        课程名称：{title}
      </span>
      <span onClick={closeBtn}>×</span>
    </div>
  );
};

class AidList extends Component {
  state = {
    aidCourseInfo: this.props.aidCourseInfo,
    loading: false,
    hasMore: true
  };
  handleInfiniteOnLoad = () => {};

  render() {
    let data = [];
    const adiCourseInfo = this.state.aidCourseInfo;
    for (let index in adiCourseInfo) {
      data.push({
        courseId: adiCourseInfo[index].id,
        title: adiCourseInfo[index].data.title,
        description: adiCourseInfo[index].data.description
      });
    }
    return (
      <div className="infinite-container">
        <InfiniteScroll
          initialLoad={false}
          pageStart={0}
          loadMore={this.handleInfiniteOnLoad}
          hasMore={!this.state.loading && this.state.hasMore}
          useWindow={false}
        >
          <List
            header={<div align="center">辅课时信息</div>}
            itemLayout="vertical "
            dataSource={data}
            renderItem={item => (
              <List.Item
                actions={[
                  <div
                    data-aid={item.courseId}
                    onClick={this.props.changeAidCourseMedia}
                  >
                    播放
                  </div>
                ]}
              >
                <List.Item.Meta
                  title={item.title}
                  description={item.description}
                />
              </List.Item>
            )}
          />
        </InfiniteScroll>
      </div>
    );
  }
}

const KnowledgeInfoArea = ({ knowledgeInfo }) => {
  return (
    <div className="KnowledgeInfoArea">
      <Card title="知识点信息">
        <p>知识点名称：{knowledgeInfo.data.title}</p>
        <p>大纲要求难度：{knowledgeInfo.data.demand}</p>
        <p>学生掌握程度：{knowledgeInfo.data.achieve}</p>
        <p style={{ visibility: 'hidden' }}> 1 </p>
      </Card>
    </div>
  );
};

const MainLessonInfoArea = ({ mainCourseInfo, changeMainCourseMedia }) => {
  return (
    <div className="mainCourseInfoArea">
      <Card
        title="主课时信息"
        extra={[
          <div
            data-mid={mainCourseInfo.id}
            style={{ cursor: 'pointer' }}
            onClick={changeMainCourseMedia}
          >
            播放
          </div>
        ]}
      >
        <p>主课时名称：{mainCourseInfo.data.title}</p>
        <p>主课时难度：{TYPE_CONVERSE[mainCourseInfo.data.difficulty]}</p>
        <p>
          主课时交互程度：{TYPE_CONVERSE[mainCourseInfo.data.interactionDegree]}
        </p>
        <p>
          主课时交互类型：{TYPE_CONVERSE[mainCourseInfo.data.interactionType]}
        </p>
      </Card>
    </div>
  );
};

const TeachInfoArea = props => {
  const { teachInfo, lessonId, enterLesson } = props;
  let keyword = [];
  if (typeof teachInfo.data.keyword === 'object') {
    teachInfo.data.keyword.forEach(item => {
      keyword.push(item.data);
    });
  } else {
    keyword.push(teachInfo.data.keyword);
  }

  return (
    <div className="teachInfoArea">
      <Card
        title="教学单元信息"
        extra={[
          <div
            style={{ cursor: 'pointer' }}
            onClick={() => {
              enterLesson(lessonId);
            }}
          >
            查看课程
          </div>
        ]}
      >
        <p>教学单元名称：{teachInfo.data.title}</p>
        <p>教学单元描述：{teachInfo.data.description}</p>
        <p>教学单元关键字：{keyword.join('；')}</p>
        <p style={{ visibility: 'hidden' }}> 1 </p>
      </Card>
    </div>
  );
};

class PDFViewer extends Component {
  state = {
    numPages: null,
    pageNumber: 1
  };
  onDocumentLoad = ({ numPages }) => {
    this.setState({ numPages });
  };

  prevPage = () => {
    this.setState(prev => {
      let newPage = prev.pageNumber <= 1 ? 1 : prev.pageNumber - 1;
      return { pageNumber: newPage };
    });
  };

  nextPage = () => {
    this.setState(prev => {
      let newPage =
        prev.pageNumber >= prev.numPages ? prev.numPages : prev.pageNumber + 1;
      return { pageNumber: newPage };
    });
  };

  closePage = () => {
    ReactDOM.unmountComponentAtNode(document.getElementById('pdfView'));
  };

  render() {
    const { pageNumber, numPages } = this.state;
    const url = this.props.url;
    return (
      <div>
        <Button onClick={this.prevPage}>上一页</Button>
        <Button onClick={this.nextPage}>下一页</Button>
        <Button onClick={this.closePage}>关闭</Button>
        <Document
          onItemClick={() => alert('oh')}
          file={DEFAULT_PDF || url}
          onLoadSuccess={this.onDocumentLoad}
        >
          <Page pageNumber={pageNumber} />
        </Document>
        <p>
          Page {pageNumber} of {numPages}
        </p>
      </div>
    );
  }
}

export default SearchKnowledgePreview;
