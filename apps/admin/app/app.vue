<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
</script>

<template>
  <div class="min-h-screen bg-background p-8">
    <div class="max-w-4xl mx-auto space-y-8">
      <header class="flex items-center justify-between">
        <div>
          <h1 class="text-4xl font-black tracking-tight">Zenith <span class="text-primary">Admin</span></h1>
          <p class="text-muted-foreground mt-2">Manage your anime streaming empire.</p>
        </div>
        <Button>Logout</Button>
      </header>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Anime</CardTitle>
          </CardHeader>
          <CardContent>
            <div class="text-3xl font-bold">128</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Episodes</CardTitle>
          </CardHeader>
          <CardContent>
            <div class="text-3xl font-bold">1,420</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div class="text-3xl font-bold">842</div>
          </CardContent>
        </Card>
      </div>

      <div class="bg-card border rounded-xl p-8 text-center space-y-4">
        <h2 class="text-2xl font-bold">Ready to add some content?</h2>
        <p class="text-muted-foreground">Start by adding a new anime series to your library.</p>
        <Button size="lg" class="px-8">Add New Anime</Button>
      </div>
    </div>
  </div>
</template>
