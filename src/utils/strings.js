export const truncateStr = (str, max = 10, By = '', addTrailing = true) => {
  const trailing = addTrailing ? '…' : '';
  const splitted =  str.split(By);

  if (splitted.length > max) {
    return `${ str.split(By).slice(0, max).join(By) }${ trailing }`;
  }

  return str
}
