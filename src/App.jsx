import { useState } from 'react'

import AppLayout from '@cloudscape-design/components/app-layout'
import TopNavigation from '@cloudscape-design/components/top-navigation'
import ContentLayout from '@cloudscape-design/components/content-layout'
import SpaceBetween from '@cloudscape-design/components/space-between'
import Container from '@cloudscape-design/components/container'
import Header from '@cloudscape-design/components/header'
import Box from '@cloudscape-design/components/box'
import ColumnLayout from '@cloudscape-design/components/column-layout'
import FormField from '@cloudscape-design/components/form-field'
import Button from '@cloudscape-design/components/button'
import Input from '@cloudscape-design/components/input'
import Select from '@cloudscape-design/components/select'
import Checkbox from '@cloudscape-design/components/checkbox'
import RadioGroup from '@cloudscape-design/components/radio-group'
import Toggle from '@cloudscape-design/components/toggle'
import Slider from '@cloudscape-design/components/slider'
import Tabs from '@cloudscape-design/components/tabs'
import Modal from '@cloudscape-design/components/modal'
import ButtonDropdown from '@cloudscape-design/components/button-dropdown'
import ExpandableSection from '@cloudscape-design/components/expandable-section'
import Table from '@cloudscape-design/components/table'
import Alert from '@cloudscape-design/components/alert'
import Flashbar from '@cloudscape-design/components/flashbar'
import Badge from '@cloudscape-design/components/badge'

const REGION_OPTIONS = [
  { label: 'US East (N. Virginia)', value: 'us-east-1' },
  { label: 'US West (Oregon)', value: 'us-west-2' },
  { label: 'EU (Frankfurt)', value: 'eu-central-1' },
  { label: 'Asia Pacific (Mumbai)', value: 'ap-south-1' },
]

const TABLE_ITEMS = [
  { id: 'wf-1024', name: 'nightly-ingest-pipeline', status: 'Success', owner: 'data-platform', updated: '2026-09-15 02:14 UTC' },
  { id: 'wf-1025', name: 'invoice-reconciliation', status: 'Success', owner: 'finance-ops', updated: '2026-09-15 03:41 UTC' },
  { id: 'wf-1026', name: 'customer-churn-scoring', status: 'Failed', owner: 'ml-platform', updated: '2026-09-15 04:02 UTC' },
  { id: 'wf-1027', name: 'weekly-audit-export', status: 'In progress', owner: 'compliance', updated: '2026-09-15 06:18 UTC' },
  { id: 'wf-1028', name: 'onboarding-notification-batch', status: 'Success', owner: 'growth', updated: '2026-09-15 07:55 UTC' },
]

function StatusBadge({ status }) {
  const colorMap = {
    Success: 'green',
    Failed: 'red',
    'In progress': 'blue',
  }
  return <Badge color={colorMap[status] || 'grey'}>{status}</Badge>
}

export default function App() {
  const [textValue, setTextValue] = useState('')
  const [selectedRegion, setSelectedRegion] = useState(REGION_OPTIONS[0])
  const [notifyChecked, setNotifyChecked] = useState(true)
  const [deployTarget, setDeployTarget] = useState('staging')
  const [autoScaleEnabled, setAutoScaleEnabled] = useState(false)
  const [replicaCount, setReplicaCount] = useState(3)
  const [activeTabId, setActiveTabId] = useState('overview')
  const [modalVisible, setModalVisible] = useState(false)
  const [lastAction, setLastAction] = useState('No action performed yet.')
  const [selectedItems, setSelectedItems] = useState([TABLE_ITEMS[0]])
  const [navigationOpen, setNavigationOpen] = useState(false)
  const [flashItems, setFlashItems] = useState([
    {
      id: 'welcome-flash',
      type: 'info',
      header: 'Component gallery loaded',
      content: 'This page exercises a broad set of Cloudscape components for UI-testing purposes.',
      dismissible: true,
      onDismiss: () =>
        setFlashItems((items) => items.filter((item) => item.id !== 'welcome-flash')),
    },
  ])

  return (
    <>
      <div id="top-nav">
        <TopNavigation
          identity={{
            href: '#',
            title: 'Cloudscape Component Gallery',
          }}
          utilities={[
            {
              type: 'button',
              text: 'Documentation',
              href: 'https://cloudscape.design',
              external: true,
              externalIconAriaLabel: 'Opens in a new tab',
            },
            {
              type: 'menu-dropdown',
              text: 'Jordan Rivera',
              description: 'jordan.rivera@example.com',
              iconName: 'user-profile',
              items: [
                { id: 'profile', text: 'Profile' },
                { id: 'preferences', text: 'Preferences' },
                { id: 'signout', text: 'Sign out' },
              ],
              onItemClick: ({ detail }) =>
                setLastAction(`Top navigation menu item selected: "${detail.id}"`),
            },
          ]}
          i18nStrings={{
            searchIconAriaLabel: 'Search',
            searchDismissIconAriaLabel: 'Close search',
            overflowMenuTriggerText: 'More',
            overflowMenuTitleText: 'All',
            overflowMenuBackIconAriaLabel: 'Back',
            overflowMenuDismissIconAriaLabel: 'Close menu',
          }}
        />
      </div>

      <AppLayout
        headerSelector="#top-nav"
        navigationHide={false}
        navigationOpen={navigationOpen}
        onNavigationChange={({ detail }) => setNavigationOpen(detail.open)}
        navigation={
          <Box padding="l">
            <Header variant="h3">Section index</Header>
            <SpaceBetween size="xs">
              <Box variant="p">Form controls</Box>
              <Box variant="p">Actions &amp; overlays</Box>
              <Box variant="p">Organize content</Box>
              <Box variant="p">Data table</Box>
            </SpaceBetween>
          </Box>
        }
        toolsHide
        notifications={<Flashbar items={flashItems} />}
        content={
          <ContentLayout
            header={
              <Header
                variant="h1"
                description="A reference page exercising a wide range of AWS Cloudscape Design System components."
              >
                Component Gallery
              </Header>
            }
          >
            <SpaceBetween size="l">
              <Alert type="info" header="About this page">
                Every section below is backed by a real Cloudscape component with functioning
                state, intended as a stable target for UI-automation and accessibility testing.
              </Alert>

              <Container header={<Header variant="h2">Form controls</Header>}>
                <ColumnLayout columns={2}>
                  <SpaceBetween size="l">
                    <FormField label="Pipeline name" description="A short, descriptive identifier">
                      <Input
                        value={textValue}
                        onChange={({ detail }) => setTextValue(detail.value)}
                        placeholder="nightly-ingest-pipeline"
                      />
                    </FormField>

                    <FormField label="AWS Region">
                      <Select
                        selectedOption={selectedRegion}
                        onChange={({ detail }) => setSelectedRegion(detail.selectedOption)}
                        options={REGION_OPTIONS}
                      />
                    </FormField>

                    <FormField label="Deployment target">
                      <RadioGroup
                        value={deployTarget}
                        onChange={({ detail }) => setDeployTarget(detail.value)}
                        items={[
                          { value: 'staging', label: 'Staging' },
                          { value: 'production', label: 'Production' },
                          { value: 'sandbox', label: 'Sandbox' },
                        ]}
                      />
                    </FormField>
                  </SpaceBetween>

                  <SpaceBetween size="l">
                    <Checkbox
                      checked={notifyChecked}
                      onChange={({ detail }) => setNotifyChecked(detail.checked)}
                    >
                      Notify me when the run completes
                    </Checkbox>

                    <FormField label="Auto scaling">
                      <Toggle
                        checked={autoScaleEnabled}
                        onChange={({ detail }) => setAutoScaleEnabled(detail.checked)}
                      >
                        {autoScaleEnabled ? 'Enabled' : 'Disabled'}
                      </Toggle>
                    </FormField>

                    <FormField label={`Replica count: ${replicaCount}`}>
                      <Slider
                        value={replicaCount}
                        onChange={({ detail }) => setReplicaCount(detail.value)}
                        min={1}
                        max={10}
                        referenceValues={[3, 6]}
                      />
                    </FormField>
                  </SpaceBetween>
                </ColumnLayout>
              </Container>

              <Container header={<Header variant="h2">Actions &amp; overlays</Header>}>
                <SpaceBetween size="m">
                  <Box variant="p">
                    Last action: <strong>{lastAction}</strong>
                  </Box>
                  <SpaceBetween direction="horizontal" size="s">
                    <Button
                      variant="primary"
                      onClick={() => setLastAction('Primary button clicked.')}
                    >
                      Save configuration
                    </Button>
                    <Button onClick={() => setModalVisible(true)}>Delete pipeline</Button>
                    <ButtonDropdown
                      items={[
                        { id: 'clone', text: 'Clone pipeline' },
                        { id: 'export', text: 'Export definition' },
                        { id: 'archive', text: 'Archive' },
                      ]}
                      onItemClick={({ detail }) =>
                        setLastAction(`Button dropdown item selected: "${detail.id}"`)
                      }
                    >
                      More actions
                    </ButtonDropdown>
                  </SpaceBetween>
                </SpaceBetween>

                <Modal
                  visible={modalVisible}
                  onDismiss={() => setModalVisible(false)}
                  header="Delete pipeline"
                  closeAriaLabel="Close modal"
                  footer={
                    <Box float="right">
                      <SpaceBetween direction="horizontal" size="xs">
                        <Button variant="link" onClick={() => setModalVisible(false)}>
                          Cancel
                        </Button>
                        <Button
                          variant="primary"
                          onClick={() => {
                            setLastAction('Pipeline deletion confirmed in modal.')
                            setModalVisible(false)
                          }}
                        >
                          Delete
                        </Button>
                      </SpaceBetween>
                    </Box>
                  }
                >
                  This will permanently delete the pipeline definition and its run history. This
                  action cannot be undone.
                </Modal>
              </Container>

              <Container header={<Header variant="h2">Organize content</Header>}>
                <SpaceBetween size="l">
                  <Tabs
                    activeTabId={activeTabId}
                    onChange={({ detail }) => setActiveTabId(detail.activeTabId)}
                    tabs={[
                      {
                        id: 'overview',
                        label: 'Overview',
                        content: (
                          <Box variant="p">
                            General information about the selected pipeline, its schedule, and
                            recent run history.
                          </Box>
                        ),
                      },
                      {
                        id: 'permissions',
                        label: 'Permissions',
                        content: (
                          <Box variant="p">
                            IAM roles and resource policies attached to this pipeline's execution
                            role.
                          </Box>
                        ),
                      },
                      {
                        id: 'monitoring',
                        label: 'Monitoring',
                        content: (
                          <Box variant="p">
                            Metrics, alarms, and log group links for observing pipeline health.
                          </Box>
                        ),
                      },
                    ]}
                  />

                  <ExpandableSection headerText="Advanced settings" variant="default">
                    <SpaceBetween size="s">
                      <Box variant="p">
                        Retry policy, timeout thresholds, and dead-letter queue configuration live
                        here. Collapsed by default to keep the primary form focused.
                      </Box>
                      <FormField label="Retry attempts">
                        <Input value="3" readOnly />
                      </FormField>
                    </SpaceBetween>
                  </ExpandableSection>
                </SpaceBetween>
              </Container>

              <Container header={<Header variant="h2">Recent workflow runs</Header>}>
                <Table
                  columnDefinitions={[
                    {
                      id: 'id',
                      header: 'Run ID',
                      cell: (item) => item.id,
                      sortingField: 'id',
                    },
                    {
                      id: 'name',
                      header: 'Workflow name',
                      cell: (item) => item.name,
                      sortingField: 'name',
                    },
                    {
                      id: 'status',
                      header: 'Status',
                      cell: (item) => <StatusBadge status={item.status} />,
                    },
                    {
                      id: 'owner',
                      header: 'Owning team',
                      cell: (item) => item.owner,
                    },
                    {
                      id: 'updated',
                      header: 'Last updated',
                      cell: (item) => item.updated,
                    },
                  ]}
                  items={TABLE_ITEMS}
                  selectionType="multi"
                  selectedItems={selectedItems}
                  onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
                  ariaLabels={{
                    selectionGroupLabel: 'Workflow run selection',
                    allItemsSelectionLabel: () => 'select all',
                    itemSelectionLabel: (_data, item) => `select run ${item.id}`,
                  }}
                  header={
                    <Header
                      counter={`(${TABLE_ITEMS.length})`}
                      actions={
                        <SpaceBetween direction="horizontal" size="xs">
                          <Button>Refresh</Button>
                          <Button variant="primary">Run workflow</Button>
                        </SpaceBetween>
                      }
                    >
                      Workflow runs
                    </Header>
                  }
                  empty={
                    <Box textAlign="center" color="inherit">
                      No workflow runs found.
                    </Box>
                  }
                />
              </Container>
            </SpaceBetween>
          </ContentLayout>
        }
      />
    </>
  )
}
