import { StyleProps, NamedStyleProps } from 'schema-form-generator';

export const styles: StyleProps = {
  objectField: {
    heading: {
      color: 'purple.500'
    }
  },
  arrayField: {
    heading: {
      fontWeight: 500
    }
  },
  switchField: {
    control: {
      marginBottom: 0
    }
  }
};

export const namedStyles: NamedStyleProps = {
  'margin-0': {
    box: {
      margin: 0
    },
    control: {
      margin: 0
    }
  },
  'section-header': {
    heading: {
      color: 'purple.500',
      fontWeight: 700
    },
    box: {
      marginBottom: 8
    }
  },
  'nested-list': {
    box: {
      margin: 0
    },
    heading: {
      alignSelf: 'flex-end'
    }
  },
  'nested-object': {
    box: {
      margin: 0
    }
  }
};