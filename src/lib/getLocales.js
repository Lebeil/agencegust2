export async function getLocales(page, client) {
  if (!client || !page) return [];

  try {
    const altLangs = page.alternate_languages || [];
    const locales = await Promise.all(
      altLangs.map(async (alt) => {
        return {
          lang: alt.lang,
          uid: alt.uid,
          type: alt.type,
        };
      })
    );
    return locales;
  } catch (e) {
    return [];
  }
}


