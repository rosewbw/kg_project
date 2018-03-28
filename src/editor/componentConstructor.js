import uuid from '../utils/uuid'

function KnowledgeUnit(name, id, x, y,thumbnailUrl) {
    //知识点基本信息
    this.id = id;
    this.name = name;
    this.thumbnailUrl = thumbnailUrl || '';
    this.root = false;

    //知识点难度和要求掌握程度
    this.demand = 0;
    this.achieve = 0;

    //知识点在画布上的位置
    this.position = {
        x: x,
        y: y
    };

    //是否是开始知识点
    this.isStart = false;

    //relationship
    this.parent = [];
    this.rely = [];
    this.related = [];
    this.brothers = [];
    this.contain = [];
    this.parallel = [];

    //包含的教学单元
    this.teachUnit = [];
}


function TeachUnit(kUnitId) {
    //教学单元基本信息
    this.id = uuid();
    this.keyword = [];
    this.status = '';
    this.description = '';
    this.title = '';
    this.knowledgeUnitId = kUnitId || '';

    //课时信息
    this.mainCourse = [];
    this.auxiliaryCourse = [];

    //学生信息
    this.student = [];

    //评论信息
    this.comments = [];
}

function Course() {
    this.id = uuid();
    this.type = '';
    this.title = '';
    this.duration = 0;

    this.interactionDegree = '';
    this.interactionType = '';

    this.clickNum = 0;
    this.difficulty = '';
    this.watchNum = '';

    this.material = [];
    this.learningObjectType = '';
    this.averageRetentionRate = 0;
    this.semanticDensity = 0;
}


function ButtonConstructor(_TargetId, _Name) {
    this.targetId = _TargetId;
    // this.buttonOptions = new ButtonOptions(_Name);
}

/*
function ButtonOptions(_Name) {
    this.name = _Name;
    this.hideAnimationSpeed = 500;
    this.backgroundImage = null;
    this.position = {
        x: null,
        y: null
    };
    this.color = 'rgba(100,149,237,0.7)';
    this.size = {
        x: null,
        y: 40
    };
    this.fontSize = 18;
    this.radius = 5;
    this.borderWidth = '0';
    this.borderColor = '#ffffff';
    this.borderStyle = 'solid';
    // this.ButtonType = null ;
    this.fontColor = '#ffffff';
    this.start = 0;
    this.end = 0;
}
*/

export {KnowledgeUnit, TeachUnit, Course, ButtonConstructor}