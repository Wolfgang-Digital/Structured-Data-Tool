import React, { useMemo } from 'react';
import { Form } from 'schema-form-generator';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { v4 } from 'uuid';
import { useToast } from '@chakra-ui/core';

import { getMainEntityList, createOrUpdateMainEntity } from './slice';
import { schema, validationSchema, options } from './schema';
import { styles, namedStyles } from 'styles/formStyles';

const MainEntityForm: React.FC = () => {
  const toast = useToast();

  const dispatch = useDispatch();

  const { webPageId } = useParams();

  const entities = useSelector(getMainEntityList);

  const defaultValues = useMemo(() => {
    return entities.find(entity => entity.parentId === webPageId) || {};
  }, [entities, webPageId]);

  if (!webPageId) {
    return <h1>404</h1>;
  }

  const handleSubmit = (values: any) => {
    if (webPageId) {
      const uuid = webPageId || v4();
      dispatch(createOrUpdateMainEntity({ uuid, parentId: webPageId, ...values }));
      toast({
        status: 'success',
        description: 'Main Entity updated!',
        duration: 2000,
        position: 'bottom-left',
        variant: 'left-accent'
      });
    } else {
      toast({
        status: 'error',
        description: 'Could not find parent ID',
        duration: 2000,
        position: 'bottom-left',
        variant: 'left-accent'
      });
    }
  };

  return (
    <Form
      schema={schema}
      handleSubmit={handleSubmit}
      selectOptions={options}
      styleProps={styles}
      namedStyleProps={namedStyles}
      formOptions={{
        defaultValues,
        validationSchema
      }}
    />
  );
};

export default MainEntityForm;
