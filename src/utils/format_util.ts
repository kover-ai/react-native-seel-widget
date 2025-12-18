export const MoneyFormat = (money: any, currency: string, options: any) => {
  try {
    // 解构options参数，提供默认值
    const { showCurrency = true, locale = '', fallbackValue = '-' } = options;
    // 如果没传 currency 或者传空串，就认为不需要做货币格式化
    const propsCurrency = currency || '';
    let targetMoney = money;
    // 如果money是null, undefined或空字符串，或者不是数字或者字符串，直接返回 fallbackValue
    if (
      targetMoney === null ||
      targetMoney === undefined ||
      targetMoney === ''
    ) {
      return fallbackValue;
    }
    // 完善判断非数字情况
    if (typeof money === 'string') {
      targetMoney = Number(money); // 或者可以使用 parseFloat(money)
    }
    // 如果转换后的值不是有效的数字，返回 fallbackValue
    if (Number.isNaN(targetMoney)) return fallbackValue;
    // 如果没有传入currency，把原数据返回，如果不是数字则显示 fallbackValue
    if (!propsCurrency) return targetMoney;
    // 检查 Intl.NumberFormat 是否支持
    if (
      typeof Intl === 'undefined' ||
      typeof Intl.NumberFormat === 'undefined'
    ) {
      // 降级处理：简单格式化
      if (showCurrency) {
        return `${targetMoney} ${propsCurrency}`;
      }
      return `${targetMoney}`;
    }
    // 币种locale 映射
    const currencyLocaleMap: any = {
      USD: 'en-US',
      CAD: 'en-CA',
      AUD: 'en-AU',
      EUR: 'de-DE',
      GBP: 'en-GB',
      NZD: 'en-NZ',
      HKD: 'zh-HK',
      SGD: 'zh-SG',
      DKK: 'da-DK',
    };
    const usedLocale =
      locale ||
      (propsCurrency.toUpperCase() in currencyLocaleMap
        ? currencyLocaleMap[propsCurrency.toUpperCase()]
        : '') ||
      'en-US';
    const numberFormat = new Intl.NumberFormat(usedLocale, {
      style: 'currency',
      currency: propsCurrency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    // 检查 formatToParts 是否支持
    if (typeof numberFormat.formatToParts !== 'function') {
      // 降级处理：使用 format 方法
      const formatted = numberFormat.format(targetMoney || 0);
      if (showCurrency) {
        return `${formatted} ${propsCurrency}`;
      }
      return formatted;
    }
    // 获取货币格式化后的各个部分，包括货币符号
    const parts = numberFormat.formatToParts(targetMoney || 0);
    // 兼容性处理：避免使用可选链操作符
    const currencyPart = parts.find((part) => part.type === 'currency');
    const currencySymbol = currencyPart ? currencyPart.value : '';
    // 特殊处理 HKD 货币，使用 $ 符号而不是 HK$
    if (propsCurrency.toUpperCase() === 'HKD') {
      const formattedNumber = numberFormat
        .format(targetMoney || 0)
        .replace(currencySymbol, '$')
        .trim();
      if (showCurrency) {
        return `${formattedNumber} ${propsCurrency}`;
      }
      return formattedNumber;
    }
    // 判断货币符号是否与 currency 一致
    if (currencySymbol === propsCurrency) {
      if (showCurrency) {
        return `${targetMoney} ${propsCurrency}`; // 如果符号一致且需要显示货币符号，返回 money + currency
      }
      return `${targetMoney}`; // 如果符号一致但不需要显示货币符号，返回只有 money
    }
    if (showCurrency) {
      return `${numberFormat.format(targetMoney || 0)} ${propsCurrency}`;
    }
    return `${numberFormat.format(targetMoney || 0)}`;
  } catch (error) {
    console.warn('moneyFormat error:', error);
    // 降级处理：返回简单的格式化结果
    const propsCurrency = currency || '';
    const { showCurrency = true, fallbackValue = '-' } = options;
    const targetMoney = money;
    if (
      targetMoney === null ||
      targetMoney === undefined ||
      targetMoney === ''
    ) {
      return fallbackValue;
    }
    const num =
      typeof targetMoney === 'string' ? Number(targetMoney) : targetMoney;
    if (Number.isNaN(num)) return fallbackValue;
    if (!propsCurrency) return num;
    if (showCurrency) {
      return `${num} ${propsCurrency}`;
    }
    return `${num}`;
  }
};
