import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      margin: theme.spacing(1)
    },
    label: {
      margin: theme.spacing(0, 1)
    },
    select: {
      width: '100%',
      margin: theme.spacing(0, 1)
    }
  })
);

const LocaleSelect = () => {
  const classes = useStyles();
  const [t, i18n] = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang).then();
  };

  return (
    <div className={classes.root}>
      <InputLabel className={classes.label} htmlFor="select-locale">
        {t('core.locale.select.label')}
      </InputLabel>
      <Select
        className={classes.select}
        inputProps={{
          name: 'locale',
          id: 'select-locale'
        }}
        aria-label={t('core.locale.select.label')}
        value={i18n.language}
        onChange={(event) => changeLanguage(event.target.value)}
      >
        <MenuItem value="zh">{t('core.locale.select.option.zh')}</MenuItem>
        <MenuItem value="en">{t('core.locale.select.option.en')}</MenuItem>
      </Select>
    </div>
  );
};

export default LocaleSelect;
