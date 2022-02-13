
export const defultDefine = {
  name: '',
  id: '',
  mode: 'wr',
  define: {
    type: 'int',
    min: '0',
    max: '100',
    start: '0',
    step: '1',
    unit: '',
    mapping: {
      0: '关',
      1: '开'
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
  if (define.mapping == undefined) {
    define.mapping = {
      0: '关',
      1: '开'
    }
  }
  if (define.min == undefined) {
    define.min = '0'
  }
  if (define.max == undefined) {
    define.max = '100'
  }
  if (define.start == undefined) {
    define.start = 0
  }
  if (define.step == undefined) {
    define.step = 1
  }
  if (define.unit == undefined) {
    define.unit = ''
  }
  if (define.min == undefined) {
    define.min = 0
  }
  if (define.arrayInfo == undefined) {
    define.arrayInfo = {
      type: 'int',
      min: '0',
      max: '100',
      start: '0',
      step: '1',
      unit: ''
    }
  }
  if (define.specs == undefined) {
    define.specs = []
  }
  return define
}
