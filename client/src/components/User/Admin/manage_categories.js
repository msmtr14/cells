import React from 'react';
import UserLayout from '../../../hoc/user';
import ManageBrands from './manage_brands';
import ManageBodies from './manage_bodies';

const ManageCategories = () => {
    return (
        <UserLayout>
            <ManageBrands/>
            <ManageBodies/>
        </UserLayout>
    );
};

export default ManageCategories;