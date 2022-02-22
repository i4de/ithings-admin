
export const defultDefine = {
  name: '',
  id: '',
  mode: 'wr',
  define: {
    type: 'int',
    min: 0,
    max: 100,
    start: 0,
    step: 1,
    unit: '',
    mapping: {
      0: '关',
      1: '开'
    },
    arrayInfo: {
      type: 'int',
      min: 0,
      max: 100,
      start: 0,
      step: 1,
      unit: ''
    }}}

export function fmtMapping(mapping) {
  const ret = []
  if (mapping == undefined) {
    return ret
  }
  for (var key in mapping) {
    ret.push({
      key: key,
      value: mapping[key]
    })
  }
  return ret
}

export function fmtModel(define) {
  console.log('fmtModel', define)
  const ret = []
  // if(Array.isArray(define) == false) {
  //   ret = []
  //   ret.push(de)
  // }
  if (define == undefined) {
    return ret
  }
  define.forEach((item) => {
    const getOne = {
      name: item.name,
      id: item.id,
      mode: 'wr',
      define: item.define
    }
    if (getOne.define == undefined) {
      getOne.define = item.dataType
    }
    getOne.define = fmtFormDefine(getOne.define)
    ret.push(getOne)
  })
  return ret
}

export function fmtModelOut(model, defineType) {
  console.log('fmtModelOut define', model)
  console.log('fmtModelOut defineType', defineType)
  const getOne = {
    name: model.name,
    id: model.id,
    mode: 'wr',
  }
  getOne[defineType] = JSON.parse(JSON.stringify(model.define))
  return getOne
}

export function fmtFormDefine(define) {
  const newDefine = define || {}
  newDefine.mapping = newDefine.mapping || { 0: '关', 1: '开' }
  newDefine.min = newDefine.min || 0
  newDefine.max = newDefine.max || 100
  newDefine.start = newDefine.start || 0
  newDefine.step = newDefine.step || 1
  newDefine.unit = newDefine.unit || ''
  newDefine.arrayInfo = newDefine.arrayInfo || {
    type: 'int',
    min: 0,
    max: 100,
    start: 0,
    step: 1,
    unit: '',
    specs: []
  }
  newDefine.specs = newDefine.specs || []
  return newDefine
}

// template 是完整的物模型模板,column是修改后的参数,funcType是物模型操作类型,oldId是操作的id,如果是新增,则为undefined
export function fmtTemplateModel(templateModel, column, oldId) {
  // todo 外面对列的修改会影响到模型的变化,需要排查一下
  const newCol = JSON.parse(JSON.stringify(column))
  const funcType = column.funcType
  delete newCol.funcType
  console.log('fmtTemplateModel', funcType, oldId, templateModel, newCol)

  templateModel[funcType].forEach((item, index) => {
    console.log('fmtTemplateModel for get', index, item)
    if (item.id === oldId) { // 如果找到需要修改的,则直接修改即可
      templateModel[funcType][index] = newCol
      return templateModel
    }
    if (item.id === newCol.id) { // id重复了需要报错
      alert('id重复了', item.id, newCol.id)
    }
  })
  templateModel[funcType].push(newCol)
  console.log('fmtTemplateModel get', templateModel)

  return templateModel
}
