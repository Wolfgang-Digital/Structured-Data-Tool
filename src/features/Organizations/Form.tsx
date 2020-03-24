import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Form } from 'schema-form-generator';
import { v4 } from 'uuid';
import { get } from 'lodash';
import { useToast } from '@chakra-ui/core';
import { useHistory } from 'react-router-dom';

import { RootState } from 'store';
import { styles, namedStyles } from 'styles/formStyles';
import { createOrUpdateOrganization } from './slice';
import { schema, options, validationSchema } from './schema';

const OrganizationForm: React.FC = () => {
  const history = useHistory();

  const toast = useToast();

  const dispatch = useDispatch();

  const { id } = useParams();

  const organizations = useSelector((state: RootState) => state.organizations.entities);

  const defaultValues: Record<string, any> = useMemo(() => {
    return get(organizations, id || '', {});
  }, [organizations, id])

  const handleSubmit = (values: any) => {
    const uuid = id || v4();
    dispatch(createOrUpdateOrganization({ uuid, ...values }));
    toast({
      status: 'success',
      description: `Organization ${id ? 'updated' : 'created'}!`,
      duration: 2000,
      position: 'bottom-left',
      variant: 'left-accent'
    });
    if (!id) {
      history.push(`/organizations/${uuid}`);
    }
  };

  if (id && Object.keys(defaultValues).length === 0) {
    return <h1>404</h1>
  }

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

export default OrganizationForm;
