<script setup lang="ts">
import Roles from './roles/Roles.vue';
import Users from './users/Users.vue';
import Companies from './companies/Companies.vue';
import Departments from './departments/Departments.vue';
import PositionLevels from './positionLevel/PositionLevels.vue';
import Notification from './notification/Notification.vue';
</script>

<template>
  <div class="card">
      <Tabs class="rounded-2xl" value="0">
            <TabList>
                <Tab value="0">Roles</Tab>
                <Tab value="1">Companies</Tab>
                <Tab value="2">Departments</Tab>
                <Tab value="3">Position Level</Tab>
                <Tab value="4">Positions</Tab>
                <Tab value="5">Users</Tab>
                <Tab value="6">Notifications</Tab>
            </TabList>
            <TabPanels>
                <TabPanel value="0">
                    <Roles />
                </TabPanel>
                <TabPanel value="1">
                    <Companies />
                </TabPanel>
                <TabPanel value="2">
                    <Departments />
                </TabPanel>
                <TabPanel value="3">
                    <PositionLevels />
                </TabPanel>
                <TabPanel value="4">
                    <p class="m-0">
                        At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa
                        qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.
                    </p>
                </TabPanel>
                <TabPanel value="5">
                    <p class="m-0">
                        <Users />
                    </p>
                </TabPanel>
                <TabPanel value="6">
                    <p class="m-0">
                        <Notification />
                    </p>
                </TabPanel>
            </TabPanels>
        </Tabs>
  </div>
</template>
