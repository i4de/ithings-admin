export function getMode(mode) {
  if (mode === 'r') {
    return '只读'
  } else {
    return '读写'
  }
}
export function getDataType(type) {
  switch (type) {
    case 'string':
      return '字符串'
    case 'bool':
      return '布尔型'
    case 'int':
      return '整数型'
    case 'float':
      return '浮点型'
    case 'enum':
      return '枚举'
    case 'timestamp':
      return '时间型'
    case 'struct':
      return '结构体'
    case 'array':
      return '数组'
  }
}
export function getDefine(define) {
  var ret = ''
  switch (define.type) {
    case 'struct':
      ret = '-'
      break
    case 'enum':
      var mapping = define.mapping
      for (var key in mapping) {
        ret = ret + key + '-' + mapping[key] + '\n'
      }
      break
    default:
      ret = '数值范围:' + define.min + '-' + define.max + '\n' +
          '初始值:' + define.start + '\n'
      '步长:' + define.step + '\n'
      '单位:' + define.unit
  }
  return ret
}

export function parseProperty(template) {
  console.log('parseProperty', template)
  var ret = {
    funcType: 'properties',
    name: template.name,
    id: template.id,
    dataType: template.define.type,
    define: getDefine(template.define),
    mode: template.mode,
    required: template.required,
    meta: template,
  }
  var define = template.define
  if (define.type == 'struct') {
    ret.detail = getDetail(define.specs, 'dataType')
    ret.hasDetail = true
  }
  return ret
}

function getDetail(values, defineName) {
  defineName = defineName || 'define'
  var detail = []
  values.forEach(function(value, index, array) {
    detail.push({
      name: value.name,
      id: value.id,
      dataType: value[defineName].type,
      define: getDefine(value[defineName])
    })
  })
  return detail
}

export function parseAction(template) {
  console.log('parseAction', template)
  var ret = {
    funcType: 'actions',
    name: template.name,
    id: template.id,
    required: template.required,
    define: '-',
    meta: template,
    hasDetail: true,
    input: getDetail(template.input),
    output: getDetail(template.input)
  }
  return ret
}

export function getFuncTypeName(name) {
  switch (name) {
    case 'properties':
      return '属性'
    case 'actions':
      return '行为'
    case 'events':
      return '事件'
  }
}
export function parseEvent(template) {
  console.log('parseEvent', template)
  var ret = {
    funcType: 'events',
    name: template.name,
    id: template.id,
    dataType: template.type,
    mode: template.mode,
    define: '-',
    required: template.required,
    meta: template,
    detail: getDetail(template.params),
    hasDetail: true
  }

  return ret
}

export function parseModelTemplate(template) {
  console.log('parseModelTemplate', template)
  var ret = []
  if (template.properties != undefined) {
    template?.properties.forEach(function(value, index, array) {
      ret.push(parseProperty(value))
    })
  }
  if (template.events != undefined) {
    template?.events.forEach(function(value, index, array) {
      ret.push(parseEvent(value))
    })
  }
  if (template.actions != undefined) {
    template.actions.forEach(function(value, index, array) {
      ret.push(parseAction(value))
    })
  }

  console.log('解析后的属性为:', ret)
  // return JSON.stringify(template)
  return ret
}
