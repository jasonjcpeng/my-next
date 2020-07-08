import fetch from 'lib/fetch';
import lcid from 'lcid'
import { LangLib } from 'interface'
import Negotiator from 'negotiator'

/**
 * 多语言 [lcid <-> 国家码] 映射表
 * 每次增加多语言要更新这里
 */
export const KeyMap = {
  "1025": "sa",
  "1028": "zh-tw",
  "1033": "en-us",
  "1034": "es",
  "1042": "ko",
  "1046": "pt",
  "1049": "ru",
  "1054": "th",
  "1055": "tr",
  "1056": "pk",
  "1057": "id",
  "1066": "vi",
  "1081": "in",
  "1086": "ms",
  "1124": "fil",
  "2052": "zh-cn",
  "2117": "bd"
}

function _transform(lang) {
  let main = lang.split('-')[0];
  switch (main) {
    case 'zh': main += '-tw'; break;
    case 'en': main += '-us'; break;
    case 'bn':
    case 'hi': main += '-in'; break;
    case 'tr': main += '-tr'; break;
    case "ar": main += '-sa'; break;
    case "ur": main += '-pk'; break;
    case "id": main += '-id'; break;
    case "vi": main += '-vn'; break;
    case "th": main += '-th'; break;
    case "fil": main += '-ph'; break;
    case "ms": main += '-my'; break;
    case "pt": main += '-br'; break;
    case "es": main += '-ES'; break;
    case "ko": main += '-KR'; break;
    case "ru": main += '-RU'; break;
  }
  return main;
}

function getLangFile(lang) {
  if (lang - 0 > 0) {
    return KeyMap[lang || 1033]
  }
  let name = _transform(lang)
  // 有时浏览器是返回没有'-'，适配一个默认的
  if (name === 'en') {
    name = 'en-US';
  } else if (name === 'zh') {
    name = 'zh-TW';
  } else if (name.indexOf('-') === -1) {
    name = 'en-US';
  }
  let code = lcid.to(_invertName(name));
  if (code == 1093) {
    // lcid没有2117的code，所以将2117转为1093
    code = 2117;
  }
  if (code == 3082) {
    // lcid没有1034的code，所以将3082转为1034
    code = 1034;
  }
  code = code == 1093 ? 2117 : code;
  return KeyMap[code || 1033];
}

function _invertName(name) {
  return _replace(name, '-', '_');
}

function _replace(name, searchVal, newVal) {
  const regExp = new RegExp(`^([a-z]{2}[a-z]?)${searchVal}([a-z]{2,})`, 'gi');
  const matched = regExp.exec(name);

  if (!matched) {
    throw new RangeError(`'${name}' is invalid format.`);
  }

  return matched[1] + newVal + matched[2].toUpperCase();
}

/**
 * 获取多语言
 * @param dir 地址
 * @param lang 多语言国家编码
 */
async function _getLangLib({
  dir = 'system',
  lang = 'en-us'
}: {
  dir?: string, lang?: string
}) {
  try {
    const langLib = await fetch.get(`/static/lang/${dir}/${getLangFile(lang)}.js`)
    return JSON.parse(langLib?.data?.replace(/^export\sdefault\s{/, '{').replace(/;$/, ''));
  } catch (error) {
    return error
  }
}


/**
 * - 获取公共多语言
 * - 获取以页面路径命名的同路径下多语言
 * @param ctx 应用context对象
 * @param path 多语言文件在public/static/lang下的路径
 * 
 * @return LangLib
 */
export async function fetchLangLib(ctx: any, path: string) {
  const negotiator = new Negotiator(ctx.req);
  const lang = ctx.query.lang ? ctx.query.lang : (negotiator.languages()[0] || 'en-us');
  const name = path ? path.replace(/\//, '_') : 'index';
  const langLib: LangLib = {
    system: await _getLangLib({ lang }),
    [name]: await _getLangLib({ dir: path || 'index', lang })
  }
  return JSON.stringify(langLib)
}
