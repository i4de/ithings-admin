// import lodash from 'lodash' // 引入axios
import cloneDeep from 'lodash/cloneDeep'

// const lodash = require('lodash')
export const defultDefine = {
  name: '',
  id: '',
  mode: 'rw',
  define: {
    type: 'int',
    min: '0',
    max: '100',
    start: '0',
    step: '1',
    unit: '',
    mapping: {
      '0': '关',
      '1': '开'
    },
    arrayInfo: {
      type: 'int',
      min: '0',
      max: '100',
      start: '0',
      step: '1',
      unit: ''
    }}}

export function fmtMapping(mapping) {
  const ret = []
  if (mapping === undefined) {
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
  if (define === undefined) {
    return ret
  }
  define.forEach((item) => {
    const getOne = {
      name: item.name,
      id: item.id,
      mode: 'rw',
      define: item.define
    }
    if (getOne.define === undefined) {
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
    mode: 'rw',
  }
  getOne[defineType] = cloneDeep(fmtFormDefine(model.define))
  // getOne[defineType] = cloneDeep(model.define)

  console.log('fmtModelOut define out', getOne[defineType])

  return getOne
}

function getString(data, defaultData) {
  if (data != undefined) {
    return String(data)
  }
  return defaultData
}

export function fmtFormDefine(define) {
  const newDefine = cloneDeep(define)
  newDefine.mapping = newDefine.mapping || { '0': '关', '1': '开' }
  newDefine.min = getString(newDefine.min, '0')
  newDefine.max = getString(newDefine.max, '100')
  newDefine.start = getString(newDefine.start, '0')
  newDefine.step = getString(newDefine.step, '1')
  newDefine.unit = newDefine.unit || ''
  if (newDefine.arrayInfo !== undefined) {
    newDefine.arrayInfo = fmtFormDefine(newDefine.arrayInfo)
  }
  if (newDefine.specs !== undefined) {
    newDefine.specs = fmtSpecs(newDefine.specs)
  } else {
    newDefine.specs = []
  }

  return newDefine
}
function fmtDefine(define) {
  const newDefine = cloneDeep(define)
  newDefine.min = getString(newDefine.min, '0')
  newDefine.max = getString(newDefine.max, '100')
  newDefine.start = getString(newDefine.start, '0')
  newDefine.step = getString(newDefine.step, '1')
  if (newDefine.arrayInfo !== undefined) {
    newDefine.arrayInfo = fmtDefine(newDefine.arrayInfo)
  }
  if (newDefine.specs !== undefined) {
    newDefine.specs = fmtSpecs(newDefine.specs)
  }
  return newDefine
}
export function fmtSpecs(specs) {
  const newSpecs = []
  specs.forEach((item) => {
    newSpecs.push(fmtSpec(item))
  })
  return newSpecs
}

export function fmtSpec(spec) {
  return {
    id: spec.id,
    name: spec.name,
    dataType: fmtDefine(spec.dataType)
  }
}

export function checkTemplateModel(funcType, templateModel, column, oldId) {
  try {
    templateModel[funcType].forEach((item, index) => {
      console.log('checkTemplateModel for get', index, item)
      if (item.id === oldId) { // 如果找到需要修改的,则直接修改即可
        throw new Error('succ')
      }
      if (item.id === column.id) { // id重复了需要报错
        throw new Error('id 重复了')
      }
    })
  } catch (e) {
    if (e.message === 'succ') {
      return
    } else {
      return e.message
    }
  }
  return
}
// template 是完整的物模型模板,column是修改后的参数,funcType是物模型操作类型,oldId是操作的id,如果是新增,则为undefined
export function fmtTemplateModel(funcType, templateModel, column, oldId) {
  const newCol = cloneDeep(column)
  console.log('fmtTemplateModel', funcType, oldId, templateModel, newCol)
  try {
    templateModel[funcType].forEach((item, index) => {
      console.log('fmtTemplateModel for get', index, item)
      if (item.id === oldId) { // 如果找到需要修改的,则直接修改即可
        templateModel[funcType][index] = newCol
        throw new Error('succ')
      }
      if (item.id === newCol.id) { // id重复了需要报错
        alert('id重复了', item.id, newCol.id)
      }
    })
  } catch (e) {
    return templateModel
  }
  templateModel[funcType].push(newCol)
  console.log('fmtTemplateModel get', templateModel)

  return templateModel
}
