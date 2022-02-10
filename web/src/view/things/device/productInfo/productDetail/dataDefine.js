export function fmtModel(funcType, define) {
  console.log('dataDefine', define)
  console.log('funcType', funcType)
  let ret = [{
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
      maping: {
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
      }}}]
  switch (funcType) {
    case 'property':
      ret = []
      define.forEach((item) => {
        const getOne = {
          name: item.name,
          id: item.id,
          mode: 'wr',
          define: item.dataType
        }
        getOne.define = fmtFormDefine(getOne.define)
        ret.push(getOne)
      })
      return ret
  }
  return ret
}

export function fmtFormDefine(define) {
  if (define.mapping == undefined) {
    define.mapping = {
      0: '关',
      1: '开'
    }
  }
  define.enum = []
  for (var i in define.mapping) {
    define.enum.push({
      key: i,
      value: define.mapping[i]
    })
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
  return define
}
